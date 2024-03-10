import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllGroups } from '../redux/slices/groups';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GroupsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { groups, status } = useSelector((state) => state.groups);

    useEffect(() => {
        dispatch(fetchAllGroups());
    }, [dispatch]);

    const handleGroupClick = (id) => {
        navigate(`/groups/${id}`);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={3}>
                {status === 'succeeded' &&
                    groups.map((group) => (
                        <Grid item xs={12} sm={6} md={4} key={group._id} onClick={() => handleGroupClick(group._id)}>
                            <Card sx={{ cursor: 'pointer' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {group.name}
                                    </Typography>
                                    {/* Дополнительные детали группы, если необходимо */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default GroupsList;