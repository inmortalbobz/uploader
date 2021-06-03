const td = require('testdouble')
const childProcess = require('child_process')

const providers = require('../../src/ci_providers')

describe('CI Providers', () => {
  afterEach(function () {
    td.reset()
  })

  it('is an array of CI providers', () => expect(providers).toBeInstanceOf(Array))
  providers.forEach(provider => {
    const inputs = {
      args: {},
      envs: {
        CI: true,
        CIRCLE_PROJECT_REPONAME: 'testRepo',
        CIRCLE_PROJECT_USERNAME: 'testOrg',
        CIRCLE_SHA1: 'testingSHA',
        GITHUB_ACTIONS: true,
        GITHUB_REF: 'refs/heads/test',
        GITHUB_REPOSITORY: 'testOrg/testRepo',
        JENKINS_URL: 'https://example.om',
        SHIPPABLE: true,
        TRAVIS: true,
        TRAVIS_REPO_SLUG: 'testOrg/testRepo',
      }
    }
    describe(`${provider.getServiceName() || ''}`, () => {
      it('has a detect() method', () => {
        expect(provider.detect).toBeInstanceOf(Function)
      })
      it('has all properties set', () => {
        props = ['branch', 'build', 'buildURL', 'commit', 'job', 'pr', 'service', 'slug']
        const serviceParams = provider.getServiceParams(inputs)
        for (const prop of props) {
          expect(serviceParams).toHaveProperty(prop)
        }
      })
    })
  })
})
