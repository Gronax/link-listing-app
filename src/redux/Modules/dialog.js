const initialState = {
  isOpen: false,
  content: 'Fallback Content',
  label: 'Tamam',
  action: () => {},
};

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

/**
 *
 * @param content
 * @param label
 * @param action
 * @returns {{type: string, payload: {isOpen: boolean, content: *}}}
 */
export function openDialog(content, label, action) {
  return {
    type: OPEN_DIALOG,
    payload: {
      isOpen: true,
      content,
      label,
      action,
    },
  };
}

/**
 *
 * @returns {{type: string, payload: {isOpen: boolean}}}
 */
export function closeDialog(content, label, action) {
  return {
    type: CLOSE_DIALOG,
    payload: {
      isOpen: false,
      content,
      label,
      action,
    },
  };
}

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export function dialogReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_DIALOG:
    case CLOSE_DIALOG:
      return payload;
    default:
      return state;
  }
}
