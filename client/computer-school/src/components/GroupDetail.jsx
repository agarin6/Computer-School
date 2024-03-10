import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGroupById } from '../redux/slices/groups';
import { Card, CardContent, Typography, Box } from '@mui/material';

const GroupDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const group = useSelector((state) => state.groups.currentGroup);

    useEffect(() => {
        dispatch(fetchGroupById(id));
    }, [dispatch, id]);

    return (
        <Box sx={{ m: 2 }}>
            {group ? (
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {group.name}
                        </Typography>
                        {/* Дополнительные детали группы */}
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="body1">Загрузка данных группы...</Typography>
            )}
        </Box>
    );
};

export default GroupDetail;