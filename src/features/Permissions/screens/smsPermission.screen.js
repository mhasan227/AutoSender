import React, {useState, useEffect} from 'react';
import {Permission} from '../components/permission.component';
import {sendDirectSms, isSMSAccepted} from '../../../services/Permissions';
export const smsPermission = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    isSMSAccepted(setAccepted);
    if (accepted === true) {
      navigation.navigate('ContactsPermission');
    }
  }, [isSMSAccepted(setAccepted)]);

  return (
    <Permission
      iconUrl={'smsIcon'}
      permissionTitle={'SMS Permission'}
      navigation={navigation}
      getPermission={sendDirectSms}
      nextPermission={() => navigation.navigate('ContactsPermission')}
      permissionContext={
        'Auto-Sender needs SMS permission to automatically send SMS messages without any user interface needed.'
      }
    />
  );
};
