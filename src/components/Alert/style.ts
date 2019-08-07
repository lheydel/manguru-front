import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/styles/makeStyles';

const commonStyle = {
    padding: '10px 15px',
    borderRadius: 3,
};

export default makeStyles({
    danger: {
        ...commonStyle,
        color: red.A700,
        background: red[50],
        borderColor: red[100],
    }
});
