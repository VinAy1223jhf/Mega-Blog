import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../button';
import Input from '../input';
import SelectBtn from '../SelectBtn';
import RTE from '../RTE';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) { // post pe 'edit' click krk hi toh user ayega, toh usi usi post se uski information nikal lo saari

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "", // agr post hai already toh usi ka title use krlo nahi toh empty
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || 'active'
        }
    })


    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)//user ka data nikal liya

    //user ne form submit krdiya 
    //toh usne information paas kri hogi
    // ab 2 options hai
    //pehla ya oh ek aleady existing post hogi uski informtion ko overwrite(update) kna hai
    //ya toh new info aayi hai toh post bnani hai nayi
    const submit = async (data) => {
        if (post) {//agr nayi post aayi hai
            //check kro ki koi nayi image aayi hai ya nahi, agr yes toh upload krdo agr nahi toh null
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.featuredImage) //agr image change hui post ki toh purani image delete bhi toh krni hai
            }

            //ab delete toh hogyi, ab update krdo post ko. Agr file(image) aagyi toh overwrite krdo featuredImage ko and nhi aayi toh bs undefined rkhdo
            const dbPost = await service.updatePost(post.$id, { //dbPost ke naam se humne ek new post create krli jisme saari values paas krenge
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            //agr dbpost mei saamaan aagya toh badhiya, navigate krdo bs post pr
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        //ab agr user ne new file upload krni hai toh....
        else {
            //uploadFile ka use krk data mei se image uthai
            const file = await service.uploadFile(data.image[0])
            //ag jab tak file mei image aa nahi jaati tab tak wait kro, ab agr aagyi toh....
            if (file) {
                //ab fileid mei uss file(image) ki id rkhdo and featuredImage mei vo fileid(indirectly rendered image store krdo)
                const fileId = file.$id
                data.featuredImage = fileId
                //ab baaki ki properties ko sidh send krdo
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {   
                    navigate(`/post/${dbPost.$id}`)
                }
            } 

        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            const slug = value.toLowerCase().replace(/ /g, '-')
            return slug
        }
        else {
            return " "
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="title :"
                    placeholder="title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <SelectBtn
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
