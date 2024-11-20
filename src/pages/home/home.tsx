import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowRight, Globe } from "lucide-react";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/register');
    };

    return (
        <div className='bg-slate-100 w-dvh h-dvh flex flex-col items-stretch justify-center'>
            <div className='mg-auto w-86 h-96 flex flex-col items-stretch justify-center text-center '>
                <Card className="w-80 m-auto h-80 flex flex-col">
                    <CardHeader>
                        <CardTitle className='text-2xl'>Father & Client</CardTitle>
                        <CardDescription>Cadastre sua empresa agora!</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0 items-stretch justify-center flex h-26'>
                       <Globe className='w-24 h-24 mg-auto' />
                    </CardContent>
                    <CardFooter className="p-0 flex items-stretch justify-center h-9 mt-8">
                        <Button className="mg-auto" onClick={handleClick}>
                            Começar cadastro <ArrowRight />
                        </Button>
                    </CardFooter>
                </Card>
                <p className='text-xs'>Father & Company - Copyright © 2024</p>
            </div>
        </div>
    );
};

export default Home;
