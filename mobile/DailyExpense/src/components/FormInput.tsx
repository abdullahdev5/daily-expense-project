import { View, Text } from 'react-native'
import React from 'react'
import AppTextInput from './TextInput';
import { useField } from 'formik';


type AppFormInputProps = {
    name: string;
    submitCount: number;
    validator: (value: string) => string | undefined;
} & React.ComponentProps<typeof AppTextInput>;


const AppFormInput = ({ name, submitCount, validator, ...props }: AppFormInputProps) => {

  const [field, meta, helpers] = useField({
    name,
    validate: validator
  });

  const error = (meta.touched || submitCount > 0) ? meta.error : undefined

  return (
    <>
      <AppTextInput
        {...props}
        error={error}
        value={field.value}
        onChangeText={(text) => helpers.setValue(text)}
        onBlur={() => helpers.setTouched(true)}
      />
    </>
  )
}

export default AppFormInput