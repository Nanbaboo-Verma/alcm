import Image from "next/image";
import Banner from "./home/banner/page";
import LookingFor from "./home/LookingFor/page";

export default function Home() {
  return (
    <div>
      <Banner />
      <LookingFor />
      <div className="max-w-7xl mx-auto p-5">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores nemo officiis amet corrupti fugiat optio aut mollitia consequuntur ipsum dolorem. Quae voluptas nemo beatae nesciunt debitis temporibus adipisci hic! Fugit id esse illo ducimus illum ipsam, error voluptatum nisi expedita explicabo necessitatibus ipsum voluptates cum eveniet mollitia obcaecati. In voluptates velit alias voluptatibus rem explicabo recusandae, sed tempora blanditiis voluptatum placeat, quaerat suscipit officia odit totam, veniam aliquid error at quibusdam praesentium? Provident doloribus laudantium sit totam cumque. Aut praesentium cupiditate itaque ut soluta asperiores, tempora illum. Pariatur, voluptatibus possimus! Suscipit repellat a quas rerum quae iusto veniam vero atque labore nam illo at, quam tempore! Incidunt, quibusdam sequi adipisci omnis delectus quaerat rerum nulla repellat cupiditate voluptatibus, at ab commodi dolor quos facere sunt non minus laudantium tenetur minima illum ratione impedit est odio. Nostrum rem temporibus quis culpa, itaque officiis, quasi fugiat illo, asperiores mollitia rerum facilis ut? Doloribus inventore id, omnis fuga in dolor eos obcaecati enim cumque rem provident commodi est! Voluptatibus, error animi. Quisquam iste assumenda incidunt facere delectus nisi quae. Adipisci quia amet possimus. Molestiae, alias tempore. Officiis ut impedit nulla quas facilis, nihil praesentium, consequatur vel qui asperiores veritatis autem. Corrupti, officiis quisquam quibusdam earum voluptatibus iste? Distinctio ipsa error eum ducimus asperiores, provident officia fuga excepturi eveniet sint atque laboriosam accusantium, consectetur quas, voluptas repellendus ea placeat. Pariatur rem nam debitis, aliquid eum a minima eos beatae accusamus quidem quo, fugit repellendus quibusdam modi ratione nostrum voluptatem, ducimus exercitationem aspernatur ad magnam praesentium temporibus deleniti. Ipsum et dolorem officiis laboriosam, quae ipsam doloribus molestias labore dicta sequi hic alias quibusdam ducimus eius laudantium nostrum unde ratione illum adipisci reprehenderit? Quae libero a quod pariatur sed suscipit assumenda nihil non vitae obcaecati sapiente quidem, temporibus distinctio possimus aspernatur rerum odio corporis ducimus error perspiciatis in perferendis quia iusto. Dolores ullam quia consequuntur natus magni praesentium suscipit beatae soluta nisi. Minus inventore repellendus necessitatibus incidunt id et delectus consequuntur consectetur soluta illo voluptates fugiat, explicabo labore debitis, ipsum ipsa quae. Quasi ducimus voluptates saepe consectetur, dignissimos maiores cupiditate eos aliquam cumque a sint ipsa animi facilis voluptas similique inventore veritatis sapiente deserunt vel laboriosam accusantium perferendis, dolor maxime! Natus totam, ab quas earum, illo incidunt doloribus neque eos dignissimos, eveniet a aliquam quia necessitatibus dicta tempore provident sapiente maxime ducimus porro. Doloremque repellat quaerat deleniti adipisci qui minima sit mollitia ex officia fugit quo nobis ab facere excepturi ad numquam necessitatibus, dolores accusamus deserunt minus ipsam non, quidem et voluptas. Magnam reiciendis iure, error odit vitae accusamus ipsam excepturi impedit, odio sint fuga nam ad, quod ut sapiente a nemo expedita. Hic dolore expedita consectetur, sunt modi dignissimos, reprehenderit quia accusamus velit, porro praesentium reiciendis. Nemo unde consectetur voluptatem quas eaque qui cumque delectus perferendis est debitis dolores ut, ipsa, harum molestiae voluptates molestias nesciunt doloribus ratione! Fugiat ullam dolores eligendi laborum reiciendis. Necessitatibus perferendis, impedit quae saepe aliquid dignissimos delectus, sit sapiente labore soluta quasi, exercitationem ab et at? Vero, odio dolores expedita libero iusto necessitatibus hic nam incidunt iure ea rerum aspernatur corrupti suscipit nostrum? Nobis laboriosam minima, sed neque, distinctio libero dolorem sapiente, eveniet veniam dolores nostrum necessitatibus cum ipsa! Incidunt reprehenderit quam animi velit esse in necessitatibus recusandae saepe placeat, non delectus impedit fuga iste molestias, blanditiis quae soluta culpa beatae doloribus aliquid. Temporibus unde veritatis qui natus recusandae, alias quam laudantium id voluptatum, velit reiciendis dolores ratione. Repellendus autem in omnis, numquam dicta nobis fugiat reprehenderit temporibus. Enim excepturi, odit cupiditate consequatur recusandae earum cumque distinctio dolorum optio est, veritatis modi non voluptates asperiores. Molestiae, delectus nam voluptate ea obcaecati necessitatibus illo placeat consectetur, et accusantium esse labore dicta debitis consequatur? Nihil asperiores illum incidunt numquam beatae modi veritatis labore deserunt ipsum, ab rerum nam placeat optio reprehenderit laudantium voluptates praesentium veniam? Nobis aut animi impedit vero, optio nisi, nesciunt, accusantium asperiores distinctio ducimus voluptatem culpa amet adipisci accusamus debitis laborum quia? Sint expedita vero voluptatum nobis doloribus quis nisi vitae repellendus iste sequi sapiente ea, recusandae cumque beatae facilis! Vero voluptate dolorum corporis quas facere molestiae velit deserunt harum mollitia repudiandae, excepturi, modi maiores enim, odio autem nihil omnis? Quas, totam reiciendis doloremque tenetur aspernatur officiis. Voluptatum perspiciatis sint pariatur, dolor, consequuntur nisi nulla velit quaerat sequi, magnam temporibus quo perferendis. Cum impedit perspiciatis culpa ipsam harum numquam iure? Eius recusandae rerum consectetur enim consequuntur animi. Inventore nesciunt, ipsum dolor libero et in illum quae rem tempore saepe! Quos cumque veritatis accusantium! At, saepe accusamus sapiente fugiat temporibus magnam, voluptate doloremque eos dignissimos veritatis dolor in vero repellendus velit recusandae commodi mollitia dicta officiis rerum facere inventore, quidem eaque? Modi doloribus earum vel porro minus, at nam aliquid! Perferendis repellendus voluptate consequatur delectus officia? Reiciendis blanditiis odio ex nemo facere accusamus excepturi, ratione molestiae quia animi quisquam facilis, alias quo. Quaerat culpa vero eum commodi quas, illum maxime nemo blanditiis iure laborum necessitatibus! Vero dicta magni ratione voluptas rem, neque recusandae aliquam iusto nostrum odio vel in suscipit similique nisi ad porro quam fugiat sunt culpa accusantium veritatis! Dolorum, alias! Sunt, tempore. Assumenda atque nam rerum quas, dolor architecto ipsam mollitia obcaecati maiores nihil laborum expedita. Quidem nobis accusamus inventore sit, at deleniti officiis soluta suscipit incidunt, nihil ut voluptas quis ea corrupti magnam voluptate doloremque ex reiciendis aliquid officia quisquam! Cum, eligendi! Magni reiciendis ea deserunt doloremque rerum dolores quibusdam laboriosam vel recusandae labore voluptas minus nostrum molestias odit eum eaque quis, voluptatum nemo ducimus. Hic excepturi id obcaecati suscipit corporis! Laboriosam tenetur sit modi laborum dolorum laudantium exercitationem, ex asperiores debitis aliquid adipisci rem ipsum voluptates nesciunt minus? Omnis saepe beatae dolorem a, non iusto molestiae aliquam fugit facere quos sunt vitae quo exercitationem distinctio! Earum laborum sint enim quas? Eveniet, quos sint nisi sapiente quo iure rem quasi dolore praesentium est a perspiciatis eligendi facere blanditiis excepturi asperiores atque, officia corrupti possimus odio cum, necessitatibus laudantium aperiam dolorem? Ullam debitis est fuga consequuntur impedit quo ab quaerat temporibus illo. Totam perferendis ullam architecto dolorem voluptate.</p>
      </div>
    </div>
  );
}
