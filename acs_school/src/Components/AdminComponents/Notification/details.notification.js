import {
    Paper,
    Typography,
    Box
} from '@material-ui/core';
import makeStyles from './notification.style'

export function NotificationCard (props) {
    const { date, content, highlight, noPaper, dense, subject} = props
    const classes = makeStyles({ dense })
    const Wrapper = noPaper ? Box : Paper
    return (
        <Wrapper className={classes.root} elevation={3}>
            {highlight && <span className={classes.highlight}></span>}
            <Typography component='p' className={classes.date}>
                <b style={{fontSize: 16, fontFamily: 'Palatino Linotype'}}>{subject}</b> {' — '} {date}
            </Typography>
            <div className={classes.content}>
                {content}
            </div>
        </Wrapper>
    )
}