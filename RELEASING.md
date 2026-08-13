# Releasing

This is a library, not a hosted app, so there's no server to deploy. "Dev,
staging, prod" here means something specific: where a change lives in git,
and which npm version tag it's published under. This doc covers both.

## Branches

- **`main`** — stable. Every tag that becomes a real, `npm install`-able
  release comes from here.
- **`dev`** — everything in progress lands here first. This is where
  release candidates get cut and tested before they're promoted to `main`.
- **`feature/<name>`** — short-lived branches off `dev` for individual
  changes, opened as a PR back into `dev`.

Normal flow: branch off `dev`, open a PR into `dev`, merge. When `dev` is
in a state worth shipping, open a PR from `dev` into `main`. Once that's
merged, tag `main` and the stable release workflow takes it from there.

## Version tags

Two tag shapes, two different workflows react to them:

| Tag looks like | Pushed from | What happens |
| --- | --- | --- |
| `v1.3.0-rc.1` | `dev` (or any branch you're testing) | `.github/workflows/prerelease.yml` builds, tests, and publishes to npm under the `next` dist-tag, plus a GitHub pre-release. |
| `v1.3.0` | `main` only | `.github/workflows/release.yml` builds, tests, publishes to npm under `latest`, and creates a GitHub Release. |

A plain `npm install landonkea-type-utils` always gets whatever `v1.3.0`
(the `latest` tag) points to. Someone has to explicitly run
`npm install landonkea-type-utils@next` to pull a release candidate.

### Cutting a release candidate

```bash
git checkout dev
git pull
git tag v1.3.0-rc.1
git push origin v1.3.0-rc.1
```

That's it, the tag push is the trigger. Bump the `rc.N` number for each
additional candidate (`v1.3.0-rc.2`, and so on) if issues turn up during
testing.

### Cutting a stable release

Once a release candidate has been tested and `dev` is merged into `main`:

```bash
git checkout main
git pull
git tag v1.3.0
git push origin v1.3.0
```

The workflow refuses to run if the tag isn't actually reachable from
`main`, so tagging the wrong branch by mistake fails loudly in CI instead
of silently publishing the wrong thing.

Neither workflow bumps `package.json`'s version for you ahead of time,
the tag itself is the source of truth. Each workflow reads the tag,
strips the leading `v`, and writes that version into `package.json`
right before publishing (`npm pkg set version=...`). You don't need to
commit a version bump separately.

## The one manual step: the npm token

Both workflows run `npm publish`, and npm requires an auth token to
publish anything. This repo does not, and cannot, generate that token for
you, it has to come from an actual npm account with publish rights to
this package.

One-time setup:

1. Log in at npmjs.com (or create an account if you don't have one).
2. Generate an **Automation** access token: Account Settings → Access
   Tokens → Generate New Token → Automation. Automation tokens work in CI
   without needing 2FA prompts on every publish.
3. In the GitHub repo, go to **Settings → Secrets and variables →
   Actions**, and add a new repository secret named `NPM_TOKEN` with that
   value.

Until that secret exists, both release workflows will build and test
successfully but fail on the `npm publish` step with an auth error. That
failure is expected and safe, nothing gets published without a valid
token.

## What each workflow actually checks before publishing

Both `prerelease.yml` and `release.yml` run the same gate before touching
npm: install dependencies, `tsc --noEmit` (typecheck), `npm run build`,
`npm test`. A release candidate or stable release only gets published if
all of that passes, same as the existing `ci.yml` workflow that already
runs on every push and PR.
