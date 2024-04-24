import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
    const { set, add, remove } = useActiveList()
    const [ activeChannel, setActiveChannel ] = useState<Channel | null>(null)

    useEffect(() => {
        let channel = activeChannel

        if(!channel) {
            channel = pusherClient.subscribe("presence-messages") // revist
            setActiveChannel(channel)
        }

        channel.bind("pusher:subscription_succeeded", (members: Members) => {
            const initialMessages: string[] = []

            members.each((member: Record<string, any>) => {
                initialMessages.push(member.id)
            })
            set(initialMessages)
            
        })

        channel.bind("pusher:member_added", (member: Record<string, any>) => {
            add(member.id)
        })

        channel.bind("pusher:member_removed", (member: Record<string, any>) => {
            remove(member.id)
        })

        return () => {
            if(activeChannel) {
                pusherClient.unsubscribe('active-list')
                setActiveChannel(null)
            }
        }


    }, [activeChannel, set, add, remove])

}
 
export default useActiveChannel;