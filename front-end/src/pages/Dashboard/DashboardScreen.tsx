import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Country, DashboardState } from 'store/modules/dashboard/types';
import {
  countriesRequest,
  updateFromCountry,
  updateToCountry,
  updateYouSend,
  updateDeliveryDate,
  endAnimations,
  reverseCurrency,
} from 'store/modules/dashboard/actions';
import Dashboard from './Layout/Dashboard.layout';

const crypto = require('crypto');
const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
console.info('Initialisation Vector', iv)
const algorithm = 'aes-256-cbc';
const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch();

  const {
    youSend,
    recipientGets,
    fromCountry,
    toCountry,
    typeDelivery,
  } = useSelector((state: { dashboard: DashboardState }) => state.dashboard);

  useEffect(() => {
    setTimeout(() => {
      dispatch(countriesRequest());
      dispatch(endAnimations());
    }, 1500);
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateYouSend(youSend));
  }, [dispatch, fromCountry, toCountry, youSend]);

  const handleClickCountry = useCallback(
    (selectorName: string, country: Country) => {
      if (selectorName === 'from') {
        return dispatch(updateFromCountry(country));
      }

      dispatch(updateToCountry(country));
    },
    [dispatch],
  );

  const handleChangeYouSend = useCallback(
    (value: string | number) => {
      dispatch(updateYouSend(Number(value)));
    },
    [dispatch],
  );

  const handleUpdateDateCalendar = useCallback(
    (date: string, delivery: string) => {
      dispatch(updateDeliveryDate(date, delivery));
    },
    [dispatch],
  );

  const handleClickReverseCurrency = useCallback(
    (from: Country, to: Country) => {
      dispatch(reverseCurrency(from, to));
    },
    [dispatch],
  );

  const handleSubmitConfirm = useCallback(() => {
    const payload = `
        SentAt: ${moment().format()},
        Plan: ${typeDelivery},
        Sent: ${youSend},
        Received: ${recipientGets},
        From: ${fromCountry.value},
        To: ${toCountry.value},
    `;
    let encryptedValue = cipher.update(payload, 'utf8', 'base64');
    encryptedValue += cipher.final('base64');
    console.info('Encrypted Value: ', encryptedValue);
    console.info('Encrypted Key: ', encryptionKey.toString('hex'));
    alert('Payment Succesfull!');
 }, [youSend, recipientGets, fromCountry, toCountry, typeDelivery]);

  return (
    <Dashboard
      onClickCountry={handleClickCountry}
      onChangeYouSend={handleChangeYouSend}
      onReverseCurrency={handleClickReverseCurrency}
      onUpdateDateCalendar={handleUpdateDateCalendar}
      onSubmitConfirm={handleSubmitConfirm}
    />
  );
};

export default DashboardScreen;
