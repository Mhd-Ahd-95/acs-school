import React from 'react';
import {
    Grid,
    Typography,
    Button
}
    from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './footer.style';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import PublishIcon from '@mui/icons-material/Publish';

export function Footer() {

    const IconMedia = [
        { Icon: FacebookIcon, url: 'http://www.facebook.com' },
        { Icon: InstagramIcon, url: 'http://instagram.com' },
        { Icon: WhatsAppIcon, url: 'http://www.whatsApp.com' },
        { Icon: YouTubeIcon, url: 'http://www.youtube.com' },
        { Icon: TwitterIcon, url: 'http://twitter.com' }
    ]

    const LinkItems = [
        { text: 'Home', url: '/' },
        { text: 'About Us', url: '/about' },
        { text: 'Contact Us', url: '/contact' }
    ]
    const classes = useStyles()
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' className={classes.footer}>
            <Grid item className={classes.btn}>
                <Link to='/apply-now' style={{textDecoration: 'none'}}>
                    <Button variant="contained" size='large' startIcon={<PublishIcon />} className={classes.apply}>
                        Apply Now
                    </Button>
                </Link>
            </Grid>
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
                    {LinkItems.map(({ text, url }, index) => (
                        <li key={index}>
                            <Link to={url}>
                                {text}
                            </Link>
                        </li>
                    ))}
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