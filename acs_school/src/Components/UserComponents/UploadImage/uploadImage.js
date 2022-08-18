import React from 'react'
import {
    Grid,
    Button
} from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import uploadImageStyles from './uploadImage.style'

export default function UploadImage (props) {

    const {formik, _spacing} = props

    const classes = uploadImageStyles()

    const   onImageUpload = event => {
        if (event.target.files.length) {
            const f = event.target.files[0]
            var reader = new FileReader();
            reader.onload = function (e) {
                formik.setFieldValue('image', reader.result)
            };
            reader.readAsDataURL(f)
        }
    };
    return <Grid className={classes.root} container justifyContent='center' alignContent='center' alignItems='center'>
        <Grid item xs={12}>
            {formik.values.image
                ? <>
                    <img src={formik.values.image} className={classes.uploadButtonImg} alt='Preview' />
                    <Button
                        variant='contained'
                        className={classes.deleteButton}
                        fullWidth
                        onClick={()=> formik.setFieldValue('image', '')}
                    >
                        REMOVE IMAGE 
                    </Button>
                </>
                : <>
                    <input
                        accept='image/*'
                        className={classes.uploadInput}
                        id='image'
                        type='file'
                        onChange={onImageUpload}
                    />

                    <label htmlFor='image' >
                        <Button
                            component='span'
                            endIcon={<CloudUpload />}
                            focusRipple
                            className={classes.uploadButton}
                            style={formik.touched['image'] && formik.errors['image'] && { border: '1px solid #E74C3C' }}
                        >
                            Upload Image
                        </Button>
                    </label>
                    {formik.touched['image'] &&
                        <span className={classes.imageHelper}>{_spacing(formik.errors['image'])}</span>
                    }
                </>}
        </Grid>
    </Grid>

}