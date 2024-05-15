import { getCourses } from "@/app/lib/actions/course";
import Link from "next/link";

export default async function Courses() {
  const list = await getCourses();

  return (
    <>
      <div className="page-section bg-alt border-top-2">
        <div className="container-fluid page__container page__container">
          <div className="row card-group-row">
            {list.map((course: any) => (
              <Course
                key={course.id}
                imgUrl={course.avatar}
                title={course.title}
                url={`/protected/admin/courses/${course.id}?title=${course.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const Course = ({ imgUrl, url, title }: { imgUrl: string; url: string; title: string }) => {
  return (
    <div className="col-lg-3 card-group-row__col">
      <div className="card card-group-row__card">
        <Link href={url} className="d-block mb-16pt">
          <img src={imgUrl} alt="" className="card-img card-img-cover" />
        </Link>

        <div className="d-flex p-16pt">
          <div className="d-flex flex-column flex">
            <div className="posts-card-popular__title card-body">
              <small className="text-muted text-uppercase">blog</small>
              <h4 className="card-title m-0">
                <a href={url}>{title}</a>
              </h4>
            </div>
          </div>
          <Link href={url}>
            <i className="material-icons text-50">more_horiz</i>
          </Link>
        </div>
      </div>
    </div>
  );
};
