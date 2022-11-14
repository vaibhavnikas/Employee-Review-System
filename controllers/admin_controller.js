module.exports.home = function(req,res){
    return res.render('admin_view',{
        title: 'Home | Admin'
    });
}