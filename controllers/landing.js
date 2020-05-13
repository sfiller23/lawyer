const models = require('../models');


 exports.get_landing = function(req, res, next) {//passport facilitates req.user if there is an active session

  if(req.user){
    res.render('landing', { title: 'Express', user: JSON.parse(JSON.stringify(req.user))});
  }else{
    res.render('landing', { title: 'Express'});
  }
}
 
 exports.submit_lead = function(req, res, next) {
   
    return models.Lead.create({
      email: req.body.lead_email,
      name: req.body.lead_name,
      text: req.body.lead_text
    }).then(lead => {
      res.redirect('/leads');
    });

}

exports.show_leads = function(req, res, next) {
  return models.Lead.findAll().then(leads => {
    res.render('landing', {title: 'Express', leads: JSON.parse(JSON.stringify(leads))});
  });
}

exports.show_lead = function(req, res, next) {
 return models.Lead.findOne({
   where:{
     id: req.params.lead_id
   }
 }).then(lead => {
    res.render('lead', {title: 'Express',lead: JSON.parse(JSON.stringify(lead))});
  });
}

exports.show_edit_lead = function(req, res, next) {
  return models.Lead.findOne({
    where:{
      id: req.params.lead_id
    }
  }).then(lead => {
     res.render('lead/edit_lead', {title: 'Express',lead: JSON.parse(JSON.stringify(lead))});
   });
 }

 exports.edit_lead = function(req, res, next) {
  return models.Lead.update({
      email: req.body.lead_email
  }, {
    where:{
      id: req.params.lead_id
    }
  }).then(result => {
    res.redirect('/lead/'+ req.params.lead_id);
  });
 }

 exports.delete_lead = function(req, res, next) {
   return models.Lead.destroy({
     where: {
       id: req.params.lead_id
     }
    }).then(result => {
      res.redirect('/leads');
    });
   }

   exports.delete_lead_json = function(req, res, next) {
    return models.Lead.destroy({
      where: {
        id: req.params.lead_id
      }
     }).then(result => {
       res.send({ msg:"Success"});
     });
    }

    exports.submit_lead_json = function(req, res, next) {
      return models.Lead.create({
        email: req.body.email,
        name: req.body.name,
        text: req.body.text,
        phone: req.body.phone
      }).then(lead => {

        res.send({ msg:"Success"});
      });
  
  }