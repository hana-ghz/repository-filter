import { TextField } from '@material-ui/core';
import { makeStyles, createStyles } from '@mui/styles';
import { theme } from '../repositoryPage/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles({
	
    
    submitBtn: {
        fontStyle: 'normal',
        backgroundColor: '#539BF5',
        fontSize: '15px',
        letterSpacing: '0.15px',
        '&.MuiButton-root': {
            backgroundColor: '#539BF5',
            minHeight: '50px',
            minWidth: '200px',
                [theme.breakpoints.down('sm')]: {
                    minWidth: '100%',

                },
            
        },
        '&.MuiButton-root.MuiButton-text': {
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: '#539BF5',
            }
        },
       
    },
    textField: {
    }
    });

export default useStyles;
