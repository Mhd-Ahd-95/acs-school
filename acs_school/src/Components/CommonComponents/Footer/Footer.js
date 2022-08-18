import React from 'react';
import {
    Grid,
    Typography,
}
    from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './Footer.Style';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import global from '../../../global'

export function CommonFooter() {

    const authUser = global.auth.user

    const IconMedia = [
        { Icon: FacebookIcon, url: 'http://www.facebook.com' },
        { Icon: InstagramIcon, url: 'http://instagram.com' },
        { Icon: WhatsAppIcon, url: 'http://www.whatsApp.com' },
        { Icon: YouTubeIcon, url: 'http://www.youtube.com' },
        { Icon: TwitterIcon, url: 'http://twitter.com' }
    ]

    const AdminItems = [
        { text: 'Accounts', url: '/admin/accounts' },
        { text: 'Registered students', url: '/admin/registered-student' },
        { text: 'Sender Contact', url: '/admin/sender-contact' }
    ]
    const SupervisorItems = [
        { text: 'Create Agenda', url: '/supervisor/create-agenda' },
        { text: 'Show Agenda', url: '/supervisor/show-agenda' },
        { text: 'Create Exam', url: '/supervisor/create-exam' }
    ]
    const classes = useStyles()
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' className={classes.footer}>
            <Grid item>
                <Typography variant='h4' className={classes.follow}>
                    Follow Us
                </Typography>
            </Grid>
            <Grid item>
                <ul className={classes.itemIcon}>
                    {IconMedia.map(({ Icon, url }, index) => (
                        <li key={index}>
                            <a rel='noreferrer' target='_blank' href={url}>
                                <Icon />
                            </a>
                        </li>
                    ))}
                </ul>
            </Grid>
            <Grid item>
                <ul className={classes.itemIcon}>
                    {authUser.user_role === 'Admin' ?
                            AdminItems.map(({ text, url }, index) => (
                                <li key={index}>
                                    <Link to={url}>
                                        {text}
                                    </Link>
                                </li>
                            ))
                            :
                            SupervisorItems.map(({ text, url }, index) => (
                                <li key={index}>
                                    <Link to={url}>
                                        {text}
                                    </Link>
                                </li>
                            ))
                        }
                </ul>
            </Grid>
            <Grid item>
                <Typography className={classes.designed} variant="h5">
                    Designed By ACS
                </Typography>
            </Grid>
        </Grid>
    )
}