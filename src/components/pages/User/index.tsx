import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import * as userActions from '../../../redux/modules/user/actions';
import { RootState } from '../../../redux';

interface Props {
  username: string | null;
}

const User: React.FC<Props> = ({ username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userActions.addUser({
        username: 'alex',
      })
    );
  }, [dispatch]);

  return <h1 className="">{`User Page ${username}`}</h1>;
};

const mapStateToProps = ({ user }: RootState) => ({
  username: user.username,
});

const enhance = connect(mapStateToProps);

export default enhance(User);
