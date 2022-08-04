const Items = require('../models/Items')

module.exports = {
    getItem: async (req,res) => {
        try{
            const items = await Items.find({}, function(err, items){
                res.render('index', {
                    itemsList: items
                })
            })

        }
        catch(err){
            console.log(err)
        }
    }
}