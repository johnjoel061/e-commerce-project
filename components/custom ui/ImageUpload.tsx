import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const ImageUpload = () => {
    return (
        <CldUploadWidget uploadPreset="ecom_admin">
            {({ open }) => {
                return (
                    <Button onClick={() => open()} className="bg-grey-1 text-white w-[400px]"
                    >
                     <Plus/> Upload Image
                    </Button>
                );
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload
