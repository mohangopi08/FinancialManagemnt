import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import ExpensivModel from "../models/Income";
import UserModel from "../models/User";
import mongoose from "mongoose";
const router = Router()


///Added Expensive
router.post('/add-income/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id :string = req.params.id as string;
    try{
        const {title, amount, category, description,date}  = req.body
        if(amount <0) {
            return res.status(400).json({
                success:false,
                message:"amount is postive intiger"
            })
        }
        const NewExpensive = await ExpensivModel.create({
            user:id,
            title,
             amount, 
             category, 
             description, 
             date
        })
        if(NewExpensive){
            return res.status(201).json({
                success:true,
                message:"income Added"
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }
})

///get the expensive
router.get('/get-incomes/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id : string = req.params.id as string
    try{
        const User = await UserModel.findById(id)
        if(!User){
            return res.status(404).json({
                success:false,
                message:"internal server error"
            })
        }else{
            const expensives = await ExpensivModel.find({user:id}).exec()
            if(expensives.length === 0){
                return res.status(404).json({
                    success:false,
                    message:"no expensive found"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    expensives:expensives
                })
            }
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }
})

///delete the expensive
router.delete('/delete-income/:expensiveid',async(req:Request,res:Response,next:NextFunction)=>{
   
    const expensiveid : string = req.params.expensiveid as string
    try{
        
        const responce = await ExpensivModel.findByIdAndDelete(expensiveid)
        if(responce){
            return res.status(200).json({
                success:true,
                message:"deleted successfully"
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


type Search = {
    title?: string;
    date?: string; // Kept as string since query parameters are received as strings
};

router.get('/search-income/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;
    const { title, date }: Search = req.query;

    try {
        console.log(date)
        const match: any = {
            user: new mongoose.Types.ObjectId(id)
        };

        if (title) {
            match.title = new RegExp(title, 'i');
        }

        if (date) {
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate.getTime())) {
                const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
                const endOfDay = new Date(parsedDate.setUTCHours(23, 59, 59, 999));
                match.date = { $gte: startOfDay, $lt: endOfDay };
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date format"
                });
            }
        }

        const data = await ExpensivModel.aggregate([
            {
                $match: match
            }
        ]);

        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



export default router