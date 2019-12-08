import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Container, TextField, Button, Grid, Typography } from '@material-ui/core'
import { addLink } from '../redux/Modules/links'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'link_name',
    'link_url',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

class App extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (values) {
    const { addLink, reset } = this.props
    values && addLink(values)
    reset()
  }

  render() {
    const { handleSubmit, pristine, submitting, classes } = this.props

    return(
      <Container maxWidth="sm">
        <form noValidate autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button variant='outlined' onClick={() => { this.props.history.push('/');}}>Return to List</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>Add New Link</Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                name="link_name"
                component={renderTextField}
                label="Link Name"
                placeholder="e.g. Alphabet"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="link_url"
                component={renderTextField}
                label="Link URL"
                placeholder="e.g. http://abc.xyz"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting}>ADD</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
};

export default connect(null, {addLink})(reduxForm({
  form: 'link-form',
  validate,
})(App)
)
