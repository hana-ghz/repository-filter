import { makeStyles, createStyles } from '@mui/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles({
	
    
    submitBtn: {
        fontStyle: 'normal',
        backgroundColor: '#539BF5',
        fontSize: '15px',
        letterSpacing: '0.15px',
        '&.MuiButton-root': {
            backgroundColor: '#539BF5',
        },
        '&.MuiButton-root.MuiButton-text': {
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: '#539BF5',
            }
        },
       
    },
    });

export default useStyles;
