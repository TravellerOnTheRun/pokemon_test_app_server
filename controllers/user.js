const User = require('../models/user');

exports.postFavourite = (req, res, next) => {
    User.findOne({ _id: req.userId})
        .then(user => {
            if(!user) {
                const error = new Error('No user was found');
                error.status = 404;
                throw error;
            };
            const pokemonObject = {
                name: req.body.name,
                types: req.body.types,
                abilities: req.body.abilities,
                stats: req.body.stats,
                imageUrl: req.body.imageUrl

            };
            user.favourites.push(pokemonObject);
            user.save()
                .then(() => res.status(200).json({message: 'The User was successfully updated'}));
        })
        .catch(err => console.log(err))
};

exports.patchFavourites = (req, res, next) => {
    User.findOne({ _id: req.userId})
    .then(user => {
        if(!user) {
            const error = new Error('No user was found');
            error.status = 404;
            throw error;
        };
        
        const newFavourites = user.favourites.filter(fav => fav.name !== req.body.name);
        user.favourites = newFavourites;
        user.save()
            .then(()=> {
                res.status(200).json({ message: `Pokemon ${req.body.name} was successfully removed from your favourites`});
            })
    })
    .catch(err => console.log(err))
};