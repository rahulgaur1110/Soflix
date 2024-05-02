import React from 'react';
import Modal from 'react-native-modal';
import {styles} from './styled';
import {FlatList, Image, ImageBackground, Text, View} from 'react-native';
import AppImages from '../../../assets/common/AppImages';
import ValidateFunction from '../../../assets/common/ValidateFunction';
import AppColor from '../../../assets/common/AppColors';
import Config from '../../../assets/common/lib/Config';

export const CommentSectionModal = ({
  isModalVisible,
  closeModal,
  commentListData,
}) => {
  const commentListRenderItem = ({item}) => {
    const profilePath = 'public/Uploads/users_profile/';

    return (
      <View style={styles.singleCommentView}>
        <View style={styles.mainImageView}>
          {item?.user?.profile_pic ? (
            <Image
              // source={AppImages.DisplayPic}
              source={{ uri: Config.ImageUrl+profilePath+item?.user?.profile_pic }}
              style={styles.commentUserPic}
            />
          ) : (
            <View style={styles.placeHolderView}>
              <Text style={styles.placeHolderText}>
                {ValidateFunction?.checkShortName(item?.user?.name || '')}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text style={{color: AppColor.white}}>{item?.user?.name}</Text>
          <Text style={{color: AppColor.white}}>{item?.comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      onSwipeComplete={closeModal}
      animationInTiming={500}
      animationOutTiming={1000}
      propagateSwipe={true}
      style={styles.modal}>
      <ImageBackground
        style={{minHeight: '55%', maxHeight: '55%'}}
        resizeMode="stretch"
        source={AppImages.background}
        imageStyle={{borderTopRightRadius: 16, borderTopLeftRadius: 16}}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 14,
          }}>
          Comments
        </Text>
        <View style={styles.centerBar} />
        <FlatList
          style={{paddingHorizontal: 18, marginBottom: 18}}
          data={commentListData}
          renderItem={commentListRenderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ImageBackground>
    </Modal>
  );
};
