const express=require('express');
const router=express.Router();
const invitadoController=require('../controllers/invitadoCont');


router.post('/',invitadoController.crearInvitado);
router.get('/:id',invitadoController.obtenerInvitados);
router.delete('/:id',invitadoController.deleteInvitados);

module.exports=router;