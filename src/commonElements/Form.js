import React from 'react'
import { View, Text, TextInput } from 'react-native'

const Form = props => {
  return (
    <View>
      <View>
      <Text> { !!header && props.header } </Text>
      </View>

        <TextInput
          placeholder='User Name'
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity>
          <Button
            title='Log In'
            onPress={ onPressAction }
          />
        </TouchableOpacity>
        <View>
          { footer }
        </View>
      
    </View>
  )
}

export default Form;
