import AssignmentModel from '../models/assignment.js';

export const createAssignment = async (req, res) => {
    try {
        const doc = new AssignmentModel({
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
            group: req.body.group,
            // Не добавляем results сразу, так как они будут добавляться по мере выполнения заданий
        });

        const assignment = await doc.save();
        res.json(assignment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create assignment',
        });
    }
};  

export const addResultToAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const resultId = req.body.resultId; // ID результата, который нужно добавить

        const assignment = await AssignmentModel.findByIdAndUpdate(
            assignmentId,
            { $push: { results: resultId } }, // Добавляем ID результата в массив
            { new: true } // Возвращаем обновлённый документ
        );

        if (!assignment) {
            return res.status(404).json({
                message: 'Assignment not found',
            });
        }

        res.json(assignment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to add result to assignment',
        });
    }
};

export const removeAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const doc = await AssignmentModel.findByIdAndDelete(assignmentId);

        if (!doc) {
            return res.status(404).json({
                message: 'Assignment doesn\'t exist',
            });
        }

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to remove assignment',
        });
    }
};

export const updateAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;

        await AssignmentModel.updateOne(
            { _id: assignmentId },
            {
                name: req.body.name,
                description: req.body.description,
                dueDate: req.body.dueDate,
                group: req.body.group,
            },
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update assignment',
        });
    }
};

export const getOneAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        // Теперь также делаем populate для results, чтобы получать детали результатов, а не только их ID
        const doc = await AssignmentModel.findById(assignmentId).populate('group').populate('results');

        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Assignment not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve assignment',
        });
    }
};

export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await AssignmentModel.find().populate('group');
        res.json(assignments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve assignments',
        });
    }
};
