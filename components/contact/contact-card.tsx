"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/general/UI/button";
import { Mail, User } from "lucide-react";
import { ContactProfile, RandomMessages } from "@/lib/types/types";
import { useEffectOnce } from "@/lib/hooks/useReactUse";
import { getInboxMessagesById } from "@/lib/actions/getAsyncData";
import { useAppDispatch } from "@/lib/store/redux-hooks";
import { inboxMessagesAction } from "@/lib/store/inbox-messages-slice";

interface ContactCardProps {
  contact: ContactProfile;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { id, profiles } = contact;
  const [imageError, setImageError] = useState(false);
  const [activeMessage, setActiveMessage] = useState<RandomMessages>(null);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    const getActiveMessage = async () => {
      const message = await getInboxMessagesById(id);
      setActiveMessage(message);
    };
    getActiveMessage();
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-dark-150">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4 h-24 w-24">
          {!imageError ? (
            <Image
              src={profiles.profileImage}
              alt={profiles.fullname}
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 96px, 96px"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-700">
              <User className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>

        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {profiles.fullname}
        </h3>

        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          {profiles.email}
        </p>

        <Link
          href={`/main/inbox/primary/${id}`}
          onClick={() => {
            dispatch(inboxMessagesAction.setActiveMessage(activeMessage));
          }}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full rounded-lg border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-dark-100"
          >
            <Mail className="mr-2 h-4 w-4" />
            Message
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
