<script lang="ts">
    // Social network icon components (replace with your own or use an icon library)
    // import { FaFacebook, FaInstagram, FaLinkedin } from 'svelte-icons/fa';

    type SociaNetworkslProps = {
        name: string;
        url: string;
    };

    type TeamProps = {
        imageUrl: string;
        name: string;
        position: string;
        socialNetworks: SociaNetworkslProps[];
    };

    const teamList: TeamProps[] = [
        {
            imageUrl: "https://i.pravatar.cc/150?img=35",
            name: "Emma Smith",
            position: "Product Manager",
            socialNetworks: [
                { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
                { name: "Facebook", url: "https://www.facebook.com/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
            ],
        },
        {
            imageUrl: "https://i.pravatar.cc/150?img=60",
            name: "John Doe",
            position: "Tech Lead",
            socialNetworks: [
                { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
                { name: "Facebook", url: "https://www.facebook.com/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
            ],
        },
        {
            imageUrl: "https://i.pravatar.cc/150?img=36",
            name: "Ashley Ross",
            position: "Frontend Developer",
            socialNetworks: [
                { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
            ],
        },
        {
            imageUrl: "https://i.pravatar.cc/150?img=17",
            name: "Bruce Rogers",
            position: "Backend Developer",
            socialNetworks: [
                { name: "Linkedin", url: "https://www.linkedin.com/in/leopoldo-miranda/" },
                { name: "Facebook", url: "https://www.facebook.com/" },
            ],
        },
    ];

    // function socialIcon(name: string) {
    //     switch (name) {
    //         case "Linkedin":
    //             return FaLinkedin;
    //         case "Facebook":
    //             return FaFacebook;
    //         case "Instagram":
    //             return FaInstagram;
    //         default:
    //             return null;
    //     }
    // }
</script>

<section id="team" class="container py-24 sm:py-32">
    <h2 class="text-3xl md:text-4xl font-bold">
        <span class="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Our Dedicated
        </span>
        Crew
    </h2>

    <p class="mt-4 mb-10 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {#each teamList as { imageUrl, name, position, socialNetworks } (name)}
            <div class="bg-muted/50 relative mt-8 flex flex-col justify-center items-center rounded-lg shadow p-4">
                <div class="mt-8 flex flex-col justify-center items-center pb-2 relative">
                    <img
                        src={imageUrl}
                        alt={`${name} ${position}`}
                        class="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover border-4 border-white shadow"
                    />
                    <div class="text-center font-bold text-lg mt-16">{name}</div>
                    <div class="text-primary text-center">{position}</div>
                </div>
                <div class="text-center pb-2">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div class="flex gap-2 mt-2">
                    <!-- {#each socialNetworks as { name: snName, url } (snName)}
                        {#if socialIcon(snName)}
                            <a
                                rel="noreferrer noopener"
                                href={url}
                                target="_blank"
                                class="inline-flex items-center justify-center rounded-full p-2 hover:bg-primary/10 transition"
                                aria-label={snName}
                            >
                                {@const Icon = socialIcon(snName)}
                                <Icon size={20} />
                            </a>
                        {/if}
                    {/each} -->
                </div>
            </div>
        {/each}
    </div>
</section>
