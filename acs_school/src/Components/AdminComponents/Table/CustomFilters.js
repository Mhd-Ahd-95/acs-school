import {
    Checkbox,
    OutlinedInput,
    // InputAdornment,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    FormControl
} from '@material-ui/core'
// import { Search } from '@material-ui/icons'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import global from '../../../global'

const useStyles = makeStyles(theme => ({
    cell: {
        // padding: 4,
    },
    textfield: {
        // width: '100%',
        // marginInline: theme.spacing(1.25),
        // marginBlock: theme.spacing(0.5),
    },
    adornment: {
        marginRight: '4px !important'
    },
    input: {
        // height: 32,
        // padding: theme.spacing(1)
    },
    dateInput: {
        paddingInline: theme.spacing(0.5),
    },
    select: {
        // width: '100%',
        // marginInline: theme.spacing(1.25),
        // marginBlock: theme.spacing(0.5),
    }
}))

const SelectMultiple = forwardRef((props, ref) => {
    const {
        colName,
        colTitle,
        column,
        onFilterChanged
    } = props
    const classes = useStyles()
    const [selected, setSelected] = useState([])
    const handleChange = e => {
        setSelected(e.target.value)
        onFilterChanged(column.tableData.id, e.target.value)
    }
    useImperativeHandle(ref, () => ({
        reset: () => {
            handleChange({ target: { value: [] } })
        }
    }))
    return (
        <div className={classes.cell}>
            <FormControl variant='outlined' fullWidth margin='dense' style={{ margin: 0 }}>
                <InputLabel htmlFor={colName}>
                    {colTitle}
                </InputLabel>
                <Select
                    multiple
                    fullWidth
                    id={colName}
                    color='primary'
                    className={classes.select}
                    value={selected}
                    input={<OutlinedInput
                        name={colTitle}
                        id={colName}
                        labelWidth={84}
                    />}
                    renderValue={selected => selected.map(item => global.methods.capitalize(item)).join(', ')}
                    onChange={e => handleChange(e)}
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        }
                    }}
                >
                    {Object.keys(column.lookup).map((item, index) =>
                        <MenuItem key={index} value={item}>
                            <Checkbox checked={selected.indexOf(item) > -1} />
                            <ListItemText primary={global.methods.capitalize(column.lookup[item])} />
                        </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
})

const ControlledTextfield = forwardRef((props, ref) => {
    const classes = useStyles()
    const { column, onFilterChanged } = props
    const [value, setValue] = useState('')
    const handleChange = e => {
        setValue(e.target.value)
        onFilterChanged(column.tableData.id, e.target.value)
    }
    useImperativeHandle(ref, () => ({
        reset: () => {
            handleChange({ target: { value: '' } })
        }
    }))
    return (
        <div className={classes.cell}>
            <TextField
                fullWidth
                placeholder={column.title}
                variant='outlined'
                id={column.field}
                className={classes.textfield}
                value={value}
                onChange={e => handleChange(e)}
                margin='dense'
                color='primary'
                style={{ margin: 0 }}
                InputProps={{
                    className: classes.input
                }}
            />
        </div>
    )
})
export default function CustomFilters(rowProps, parentStates) {
    const { columns } = rowProps
    const {
        setInit, init,
        filtersComponents, setFiltersComponents,
        filterRefs
    } = parentStates
    const classes = useStyles()
    useEffect(() => {
        if (init) {
            setInit(false)
            setFiltersComponents(filtersComponents.map((Component, colID) => {
                if (!Component)
                    return null
                if (columns[colID].filtering !== undefined && columns[colID].filtering === false)
                    return null
                if (columns[colID].lookup) {
                    const ref = columns[colID].title === 'Status' ? filterRefs.StatusRef :
                        columns[colID].title === 'Role' ? filterRefs.RoleRef : null
                    return <SelectMultiple
                        key={colID}
                        ref={ref}
                        colName={columns[colID].field}
                        colTitle={columns[colID].title}
                        column={columns[colID]}
                        onFilterChanged={rowProps.onFilterChanged}
                    />
                }
                if (columns[colID].field) {
                    const ref =
                        columns[colID].title === 'Student Name' ? filterRefs.StudentNameRef
                            : columns[colID].title === 'Current School' ? filterRefs.CurrentSchoolRef
                                : columns[colID].title === 'Parent Name' ? filterRefs.ParentNameRef
                                    : columns[colID].title === 'Email' ? filterRefs.EmailRef :
                                        columns[colID].title === 'First Name' ? filterRefs.FirstNameRef : columns[colID].title === 'Last Name' ?
                                            filterRefs.LastNameRef : columns[colID].title === 'Phone' ? filterRefs.PhoneRef :
                                                columns[colID].title === 'Name' ? filterRefs.NameRef :
                                                    columns[colID].title === 'Father Name' ? filterRefs.fatherRef :
                                                        columns[colID].title === 'Mother Name' ? filterRefs.motherRef : columns[colID].title === 'Address' ? filterRefs.AddressRef : null
                    return <ControlledTextfield
                        key={colID}
                        ref={ref}
                        column={columns[colID]}
                        onFilterChanged={rowProps.onFilterChanged}
                    />
                }
            }))
        }
    }, [])

    return null
}