import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSchedules, createSchedule, updateSchedule, deleteSchedule } from '../redux/slices/schedules';
import { fetchAllGroups } from '../redux/slices/groups';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function ScheduleManager() {
    const dispatch = useDispatch();
    const schedules = useSelector(state => state.schedules.schedules);
    const groups = useSelector(state => state.groups.groups);
    const [open, setOpen] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState({ group: '', dateTime: new Date(), location: '' });

    useEffect(() => {
        dispatch(fetchAllSchedules());
        dispatch(fetchAllGroups());
    }, [dispatch]);

    const handleClickOpen = (schedule = null) => {
        setCurrentSchedule(schedule ? { ...schedule, dateTime: new Date(schedule.dateTime) } : { group: '', dateTime: new Date(), location: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentSchedule({ group: '', dateTime: new Date(), location: '' });
    };

    const handleSave = () => {
        if (currentSchedule?._id) {
            dispatch(updateSchedule({ id: currentSchedule._id, updatedData: currentSchedule }));
        } else {
            dispatch(createSchedule(currentSchedule));
        }
        handleClose();
    };

    const handleDelete = (id) => {
        dispatch(deleteSchedule(id));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentSchedule(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <Button variant="outlined" onClick={() => handleClickOpen()}>Add Schedule</Button>
            <List>
                {schedules.map((schedule) => (
                    <ListItem key={schedule._id}>
                        <ListItemText primary={`Schedule for ${schedule.group} at ${schedule.location} on ${schedule.dateTime}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(schedule)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(schedule._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="xl" // Set to 'xl' for an even larger dialog
            >
                <DialogTitle>{currentSchedule?._id ? 'Edit Schedule' : 'New Schedule'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="group-label">Group</InputLabel>
                                <Select
                                    labelId="group-label"
                                    id="group"
                                    name="group"
                                    value={currentSchedule.group}
                                    onChange={handleChange}
                                    autoWidth
                                >
                                    {groups.map((group) => (
                                        <MenuItem key={group._id} value={group._id}>{group.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} // This will make the DatePicker take up half the width on medium devices and center it
                        >
                            <DatePicker
                                selected={currentSchedule.dateTime}
                                onChange={(date) => setCurrentSchedule(prev => ({ ...prev, dateTime: date }))}
                                showTimeSelect
                                dateFormat="Pp"
                                className="form-control"
                                wrapperClassName="datePicker" // Use this class to apply custom styling if needed
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="location"
                                label="Location"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={currentSchedule.location || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScheduleManager;
