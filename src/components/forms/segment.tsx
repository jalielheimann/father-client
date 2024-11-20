// src/components/Segment.tsx

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface SegmentProps {
  onNext: (data: SegmentFormData) => void;
}

interface SegmentFormData {
  segmento: string;
  subsegmento: string;
}

const segmentSchema = z.object({
  segmento: z.string().nonempty('O segmento é obrigatório'),
  subsegmento: z.string().nonempty('O subsegmento é obrigatório'),
});

const Segment: React.FC<SegmentProps> = ({ onNext }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SegmentFormData>({
    resolver: zodResolver(segmentSchema),
    defaultValues: {
      segmento: '',
      subsegmento: '',
    }
  });

  const submitHandler = (data: SegmentFormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        {/* SEGMENT */}
        <Card className='w-80 my-4 mx-auto h-max flex flex-col text-left'>
          <CardHeader className='my-0 pt-6 pb-2 px-6 w-full'>
            <CardTitle>Segmento</CardTitle>
            <CardDescription>
              <Controller
                name="segmento"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Segmento</SelectLabel>
                        <SelectItem value="textil">Textil</SelectItem>
                        <SelectItem value="maqEquip">Máquinas e Equipamentos</SelectItem>
                        <SelectItem value="alimentBebi">Alimentos e Bebidas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.segmento && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.segmento.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 pt-2 pb-2 px-6 w-full'>
            <CardTitle>Subsegmento</CardTitle>
            <CardDescription>
              <Controller
                name="subsegmento"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Subsegmento</SelectLabel>
                        <SelectItem value="subtextil">Sub Textil</SelectItem>
                        <SelectItem value="submaqEquip">Sub Máquinas e Equipamentos</SelectItem>
                        <SelectItem value="subalimentBebi">Sub Alimentos e Bebidas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subsegmento && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.subsegmento.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardFooter className='py-4 pb-6'>
            <Button className='w-full' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Validando...' : 'Próximo'} <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default Segment;
