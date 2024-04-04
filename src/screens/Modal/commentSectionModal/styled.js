import {StyleSheet} from 'react-native';
import AppColor from '../../../assets/common/AppColors';
export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: 400,
  },
  centerBar: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 12,
  },
  singleCommentView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  commentUserPic: {
    width: 32,
    height: 32,
    marginRight: 10,
    marginBottom: 8,
  },
  placeHolderView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeHolderText: {
    fontSize: 12,
    color: AppColor.white,
    fontWeight: '500',
  },
  mainImageView: {
    borderRadius: 32,
    width: 32,
    height: 32,
    display: 'flex',
    backgroundColor: '#1F222A',
    marginRight: 10,
    marginBottom: 8,
  },
});
