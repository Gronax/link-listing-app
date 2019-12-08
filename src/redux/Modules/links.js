import { toastr } from 'react-redux-toastr'
import store from 'store2'
import moment from 'moment'

const initialState = {}
const FORM_NAME = 'links_store'

// Actions
export const ADD_LINK = 'ADD_LINK'
export const GET_LINKS = 'GET_LINKS'
export const UPDATE_INVOICE = 'UPDATE_INVOICE'
export const DELETE_INVOICE = 'DELETE_INVOICE'

let nextTodoId = 0

function CreateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

// Action Creators
export function addLink (values) {
  const myStore = store.get(FORM_NAME) || []

  let data = {
    id: CreateUUID(),
    points: 0,
    created_date: moment(),
    ...values,
  }

  // if created UUID is not unique create new one
  myStore.some((el) => (el.id === data.id)) ? data.id = CreateUUID() : data.id

  // if link name is not unique don't add it
  const isUniqueName = myStore.some((el) => (el.link_name === data.link_name))

  if (!isUniqueName) {
    myStore.push(data)
    store.set(FORM_NAME, myStore)
    toastr.success('Success', `${data.link_name} added.`)
  } else {
    toastr.error('Error', 'Duplicated link name.')
  }

  return {
    type: ADD_LINK,
    payload: {
      links: myStore
    }
  }
}

export function getLinks (page) {
  const myStore = store.get(FORM_NAME) || []

  return {
    type: GET_LINKS,
    payload: {
      links: myStore
    }
  }
}


export function updateLink (id, values, callback) {
  const request = axios.post(`/uyelik/edit-link.json/${id}`, values)
    .then((response) => {
      callback()
      toastr.light('', response.data.message, {icon: 'success'})
    })

  return {
    type: UPDATE_INVOICE,
    payload: request
  }
}

export function deleteLink (id, callback) {
  const request = axios.post(`/uyelik/delete-link.json/${id}`)
    .then((response) => {
      callback()
      toastr.light('', response.data.message, {icon: 'success'})
    })

  return {
    type: DELETE_INVOICE,
    payload: request
  }
}

export function linkReducer (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_LINKS:
      return payload.links
    default:
      return state
  }
}
