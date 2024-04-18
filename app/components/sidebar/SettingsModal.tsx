"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../input/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import Button from "../Button";
import { Loader2 } from "lucide-react";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Update your account settings
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <div className="">
                    <Image
                      className="rounded-full"
                      src={
                        image || currentUser?.image || "/images/placeholder.png"
                      }
                      alt={currentUser?.name!}
                      width="60"
                      height="70"
                    />
                  </div>
                  <div className="ml-3 flex gap-7">
                    <div className="flex flex-col">
                      <div className="text-sm leading-5 font-medium text-gray-900">
                        {currentUser?.name}
                      </div>
                      <div className="text-sm leading-5 text-gray-500">
                        {currentUser?.email}
                      </div>
                    </div>
                    <CldUploadButton
                      options={{ maxFiles: 1 }}
                      onUpload={handleUpload}
                      uploadPreset="aytzdpit"
                    >
                      <Button disabled={isLoading} secondary type="button">
                        Change Profile Image
                      </Button>
                    </CldUploadButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
  
        </div>

        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
