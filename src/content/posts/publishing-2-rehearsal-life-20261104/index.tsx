import type { LifeEducationPost } from "../../postTypes";
import { PostFigure } from "../../../components/PostFigure";
import { metadata } from "./meta";
import body1 from "./images/body-image-1.webp";
import body2 from "./images/body-image-2.webp";
import body3 from "./images/body-image-3.webp";
import body4 from "./images/body-image-4.webp";
const post: LifeEducationPost = {
...metadata,
body: <>
<p>This is a controlled synthetic test. It must never be merged or published.</p>
<PostFigure src={body1} alt="Plain synthetic body illustration 1." />
<PostFigure src={body2} alt="Plain synthetic body illustration 2." />
<PostFigure src={body3} alt="Plain synthetic body illustration 3." />
<PostFigure src={body4} alt="Plain synthetic body illustration 4." />
<p><a href="/contact">Contact us.</a></p>
</>,
};
export default post;
