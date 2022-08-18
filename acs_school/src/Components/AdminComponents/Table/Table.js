import React, { useState } from 'react'
import useStyles, { tableStyles } from './Table.Style'
import Icons from './Icons'
import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@material-ui/icons'
import { Grid, Button, Paper, Collapse, Box } from '@material-ui/core'
import { Tune } from '@material-ui/icons'
import CustomFilters from './CustomFilters'

function ButtonCollapse(props) {
    const { open, setOpen } = props
    return (
        <Button
            variant={open ? 'outlined' : 'contained'}
            onClick={() => setOpen(!open)}
            color='primary'
        >
            {props.title}
            {open ? <ExpandLessIcon />
                : <ExpandMoreIcon />}
        </Button>
    )
}

const MaterialTable = React.lazy(() => import('@material-table/core'))

export function Table(props) {
    const tableRef = React.createRef()
    let { data, isLoading, title, columns, actions, options, refresh } = props
    const classes = useStyles()
    actions = actions ? [...actions] : []
    if (refresh)
        actions.push({
            icon: Icons.Refresh,
            tooltip: 'Refresh',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        })
    options = {
        ...tableStyles,
        actionsColumnIndex: -1,
        draggable: false,
        padding: 'dense',
        toolbar: false,
        ...(options || {}),
    }
    const initFilters = [
        ...(columns.map(col => col.filtering === undefined ? <input /> : null))
    ]
    const studentsFilterRefs = {
        StudentNameRef: React.useRef(),
        CurrentSchoolRef: React.useRef(),
        StatusRef: React.useRef(),
        ParentNameRef: React.useRef(),
    }

    const accountsFilterRefs = {
        EmailRef: React.useRef(),
        FirstNameRef: React.useRef(),
        LastNameRef: React.useRef(),
        RoleRef: React.useRef(),
        PhoneRef: React.useRef(),
    }

    const contactFilterRefs = {
        NameRef: React.useRef(),
        EmailRef: React.useRef(),
    }

    const userFilterRefs = {
        fatherRef: React.useRef(),
        motherRef: React.useRef(),
        EmailRef: React.useRef(),
        PhoneRef: React.useRef(),
        AddressRef: React.useRef(),
    }

    const handleClearFilters = () => {
        const filterRefs = props.tabletype === 'students' ? studentsFilterRefs : props.tabletype === 'contacts' ? contactFilterRefs : props.tabletype === 'users' ? userFilterRefs : accountsFilterRefs
        Object.keys(filterRefs).forEach(key => {
            const ref = filterRefs[key]
            if (ref.current)
                ref.current.reset()
        })
    }
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [filtersComponents, setFiltersComponents] = useState(initFilters)
    const [init, setInit] = useState(true)
    const FilterRowGrid = props => {
        if (props.tabletype === 'students')
            return <Grid item xs={12} sm={props.index === 1 ? 6 : 6} md={props.index === 3 ? 3 : 3}>
                {props.children}
            </Grid>
        if (props.tabletype === 'accounts')
            return <Grid item xs={12} sm={props.index === 0 ? 12 : 6} md={props.index === 1 ? 4 : 2}>
                {props.children}
            </Grid>
        if (props.tabletype === 'contacts')
            return <Grid item xs={12} sm={props.index === 0 ? 6 : 6} md={props.index === 0 ? 6 : 6}>
                {props.children}
            </Grid>
        if (props.tabletype === 'users')
            return <Grid item xs={12} sm={props.index === 2 ? 12 : 6} md={props.index === 2 ? 4 : 2}>
                {props.children}
            </Grid>
        return <Grid item xs={12} sm={props.index < 2 ? 6 : 4} md={props.index === 0 ? 2 : 3}>
            {props.children}
        </Grid>
    }
    return (
        <>
            <React.Suspense fallback={<Paper className={classes.placeholder}></Paper>}>
                {/* <div className={classes.tableContainer} style={{ maxWidth: tableWidth }}> */}
                <Grid
                    container
                    justifyContent='space-between'
                    direction='row-reverse'
                >
                    <Grid container item xs={12} sm={9} justifyContent='flex-end'>
                        {props.topActions &&
                            <Grid
                                component={Box} pb={1}
                                item xs={12} sm={'auto'} md={'auto'} lg={'auto'}
                                className={classes.actionBtn}
                            >
                                {props.topActions}
                            </Grid>}
                    </Grid>
                    {props.filter &&
                        <Grid container item component={Box} mb={1} xs={12} sm={2} md={2} lg={2}>
                            <ButtonCollapse
                                title='Filters'
                                openIcon={<Tune />}
                                closeIcon={<Tune />}
                                textAlign='end'
                                component='form'
                                open={filtersOpen}
                                setOpen={setFiltersOpen}
                            />
                        </Grid>}
                </Grid>
                {props.filter &&
                    <Collapse component={Box} in={filtersOpen} mb={2}>
                        <Grid
                            container item
                            component={Box} pb={1}
                            className={classes.tableFiltersPanel}
                            spacing={1}
                            justifyContent='flex-end'
                        >
                            {filtersComponents.map((FilterComponent, index) => FilterComponent
                                ? <FilterRowGrid key={index} index={index} tabletype={props.tabletype} >
                                    {FilterComponent}
                                </FilterRowGrid>
                                : null)}
                            <Grid item xs={12} sm={3} md={2} lg='auto' style={{ alignSelf: 'center' }}>
                                <Button
                                    size='medium'
                                    padding={2}
                                    variant='outlined'
                                    color='secondary'
                                    onClick={handleClearFilters}
                                    fullWidth
                                >
                                    Clear Filters
                                </Button>
                            </Grid>
                        </Grid>
                    </Collapse>}
                <div className={classes.tableLayout}>
                    <MaterialTable
                        icons={Icons}
                        tableRef={tableRef}
                        data={data || []}
                        title={title}
                        columns={columns || []}
                        actions={actions || []}
                        options={options || {}}
                        isLoading={isLoading}
                        onRowClick={props.onRowClick}
                        parentChildData={props.parentChildData}
                        detailPanel={props.detailPanel}
                        components={{
                            FilterRow: rowProps => CustomFilters(rowProps, {
                                init, setInit,
                                filtersComponents, setFiltersComponents,
                                filterRefs: props.tabletype === 'students' ? studentsFilterRefs : props.tabletype === 'contacts' ? contactFilterRefs : props.tabletype === 'users' ? userFilterRefs : accountsFilterRefs
                            })
                        }}
                    />
                </div>
                {/* </div> */}
            </React.Suspense>
            {/* <div ref={tableGuideRef} style={{ width: '100%' }} /> */}
        </>
    )
}