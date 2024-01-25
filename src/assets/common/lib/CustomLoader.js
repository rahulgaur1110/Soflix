import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, } from 'react-native';
import Helper from './Helper';

const screenhight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class CustomLoader extends React.Component {
  constructor() {
    super();
    this.state = {
      loader: false,
    };
  }

  componentDidMount() {
    Helper.registerLoader(this);
  }

  render() {
    return (
      <>
        {this.state.loader && (
          <View style={styles.container}>
            <View style={styles.spinnerCss}>
              <ActivityIndicator animating={true} size="large" color={'#fff'} />
            </View>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex:1,backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', height: screenhight+100, width: screenWidth, position: 'absolute', zIndex: 1000 },
  spinnerCss: { alignItems: 'center', padding: 30 },
});