import consola from 'consola'
import chalk from 'chalk'
import { readFile } from 'fs/promises'
import path from 'path'
import { errorAndExit, getWorkspacePackages } from '@vuesax-alpha/build-utils'
import type { Project } from '@pnpm/find-workspace-packages'
import pkg from '../packages/vuesax-alpha/package.json'

function normalizeVersion(version: string) {
  return version.startsWith('v') ? version.slice(1) : version
}

function bumpPatchVersion(version: string) {
  const match = normalizeVersion(version).match(/^(\d+)\.(\d+)\.(\d+)(-.+)?$/)
  if (!match) {
    throw new Error(`Invalid version: ${version}`)
  }

  const [, major, minor, patch, suffix] = match
  const nextPatch = Number.parseInt(patch, 10) + 1
  return `${major}.${minor}.${nextPatch}${suffix ?? ''}`
}

async function resolveGitHead() {
  const gitHeadFromEnv = process.env.GIT_HEAD?.trim()
  if (gitHeadFromEnv) return gitHeadFromEnv

  const gitDir = path.resolve(process.cwd(), '.git')
  const headFile = await readFile(path.resolve(gitDir, 'HEAD'), 'utf8')
  const head = headFile.trim()

  if (!head.startsWith('ref: ')) {
    return head
  }

  const ref = head.slice(5).trim()
  const refPath = path.resolve(gitDir, ref)

  try {
    return (await readFile(refPath, 'utf8')).trim()
  } catch {
    const packedRefs = await readFile(path.resolve(gitDir, 'packed-refs'), 'utf8')
    const packedRefLine = packedRefs
      .split('\n')
      .find((line) => line && !line.startsWith('#') && !line.startsWith('^') && line.endsWith(` ${ref}`))

    if (!packedRefLine) {
      throw new Error(`Cannot resolve git head from ref: ${ref}`)
    }

    return packedRefLine.split(' ')[0].trim()
  }
}

function resolveTagVersion() {
  const tagVersion = process.env.TAG_VERSION?.trim()
  if (tagVersion) return normalizeVersion(tagVersion)

  return bumpPatchVersion(pkg.version)
}

async function main() {
  const tagVersion = resolveTagVersion()
  const gitHead = await resolveGitHead()

  consola.log(chalk.cyan('Start updating version'))
  consola.log(chalk.cyan(`$TAG_VERSION: ${tagVersion}`))
  consola.log(chalk.cyan(`$GIT_HEAD: ${gitHead}`))

  consola.debug(chalk.yellow(`Updating package.json for @yqb-self/my-vuesax`))

  const pkgs = Object.fromEntries(
    (await getWorkspacePackages()).map((pkg) => [pkg.manifest.name!, pkg])
  )
  const vuesaxAlpha =
    pkgs['@yqb-self/my-vuesax'] ||
    pkgs['vuesax-alpha'] ||
    pkgs['@vuesax-alpha/nightly']
  const eslintConfig = pkgs['@vuesax-alpha/eslint-config']
  const metadata = pkgs['@vuesax-alpha/metadata']

  const writeVersion = async (project: Project) => {
    consola.success(chalk.green(`Updating ${project} version`))

    await project.writeProjectManifest({
      ...project.manifest,
      version: tagVersion,
      gitHead,
    } as any)
  }

  try {
    await writeVersion(vuesaxAlpha)
    await writeVersion(eslintConfig)
    await writeVersion(metadata)
  } catch (err: any) {
    errorAndExit(err)
  }

  consola.debug(chalk.green(`$GIT_HEAD: ${gitHead}`))
  consola.success(chalk.green(`Git head updated to ${gitHead}`))
}

main()
