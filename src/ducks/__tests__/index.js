/* @flow */

/* eslint-disable func-names, prefer-arrow-callback */

import project, { actions, types } from '../index'

const expect = require('chai').expect

const testRepo = {
  name: 'test',
  description: 'just to have an object',
  owner: 'testowner',
}

const initialState = {
  isFetching: false,
  tree: [testRepo],
  project: [testRepo],
}

describe('Projects Actions', function () {
  it('Should return an action of type PROJECTS_FAILURE with an error key', function () {
    const errors = 'some error'
    const errorAction = { type: types.PROJECTS_FAILURE, errors }
    expect(actions.fetchProjectsFailure(errors)).to.eql(errorAction)
  })

  it('Should return an action of type PROJECTS_SUCCESS with a result object', function () {
    const result = { data: 'data' }
    const successAction = { type: types.PROJECTS_SUCCESS, result }
    expect(actions.fetchProjectsSuccess(result)).to.eql(successAction)
  })

  it('Should return an action of type PROJECTS_REQUEST with nothing', function () {
    const reqAction = { type: types.PROJECTS_REQUEST }
    expect(actions.fetchProjects()).to.eql(reqAction)
  })

  it('Should return an action of type PROJECTS_FETCHING with the correct boolean', function () {
    const trueAction = { type: types.PROJECTS_FETCHING, fetching: true }
    expect(actions.fetchingStatus(true)).to.eql(trueAction)
    const falseAction = { type: types.PROJECTS_FETCHING, fetching: false }
    expect(actions.fetchingStatus(false)).to.eql(falseAction)
  })
})

describe('Projects Reducers', function () {
  it('Should not modify state with PROJECTS_REQUEST action', function () {
    const nextState = project(initialState, actions.fetchProjects())
    expect(initialState).to.eql(nextState)
  })

  it('Should set the isFetching value with fetchingStatus and nothing else', function () {
    const trueState = Object.assign({}, initialState)
    trueState.isFetching = true
    const firstState = project(initialState, actions.fetchingStatus(true))
    expect(trueState).to.eql(firstState)
    const secondState = project(firstState, actions.fetchingStatus(true))
    expect(firstState).to.eql(secondState)
    const thirdState = project(firstState, actions.fetchingStatus(false))
    expect(thirdState).to.eql(initialState)
  })

  it('Should get errors from error object with PROJECT_FAILURE', function () {
    const errors = [{ message: 'error 1', location: null },
                    { message: 'error 2', location: null }]
    const nextState = project(initialState, actions.fetchProjectsFailure(errors))
    const errorState = Object.assign({}, initialState)
    errorState.errors = ['error 1', 'error 2']

    expect(errorState).to.eql(nextState)
  })
})