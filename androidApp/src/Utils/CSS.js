import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from './Dimensions';

export const cssFile = StyleSheet.create({
  signParentContainer: {
    flex: 1,
    backgroundColor: '#131129',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#fff',
    color: 'white',
    backgroundColor: '#131129',
    // marginBottom : 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '500',
  },

  validationText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 0,
    fontWeight: '700',
  },

  rowBetweenCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  colBetweenCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems : "center",
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  bottomTabsParentContainer: {
    backgroundColor: '#131129',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  theadText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    // borderWidth : 1,
    flex: 1,
    textAlign: 'left',
  },

  tbodyText: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
  },
});
