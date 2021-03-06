import { toastr } from 'react-redux-toastr'
import store from 'store2'
import moment from 'moment'
import sort from 'fast-sort'

const initialState = {}
const FORM_NAME = 'links_store'

// Actions
export const ADD_LINK = 'ADD_LINK'
export const GET_LINKS = 'GET_LINKS'
export const UPDATE_POINTS = 'UPDATE_POINTS'
export const DELETE_LINK = 'DELETE_LINK'

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

export function getLinks (order = 'desc') {
  const myStore = store.get(FORM_NAME) || []
  const pointsOrder = order === 'asc' ? { asc: u => u.points } : { desc: u => u.points }

  sort(myStore).by([
    pointsOrder,
    { desc: u => u.created_date }
  ])

  return {
    type: GET_LINKS,
    payload: {
      links: myStore
    }
  }
}


export function updatePoints (id, isUpvote) {
  let myStore = store.get(FORM_NAME) || []
  
  const newStore = myStore.map(item => {
    let temp = Object.assign({}, item);
    if (temp.id === id) {
      isUpvote ? temp.points++ : temp.points--
    }
    return temp
  })

  store.set(FORM_NAME, newStore)

  return {
    type: UPDATE_POINTS,
    payload: {
      links: newStore
    }
  }
}

export function deleteLink (id) {
  let myStore = store.get(FORM_NAME) || []
  myStore.map(item => {
    if (item.id === id) {
      toastr.success('Success', `${item.link_name} removed.`)
    }
  })
  myStore = myStore.filter(obj => obj.id !== id)
  store.set(FORM_NAME, myStore)
  console.log('myStore', myStore)

  return {
    type: DELETE_LINK,
    payload: myStore
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
