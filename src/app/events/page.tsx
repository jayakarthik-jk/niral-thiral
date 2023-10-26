import Container from "@/components/Container";

export default function Event() {
  return (
    <Container className="h-screen items-center justify-center bg-primary">
      <div className="flex h-4/5 w-4/5 flex-col items-center justify-evenly gap-2 rounded-md border border-primary-foreground bg-primary p-4 text-primary-foreground">
        <h1 className="text-xl">Coding Chess</h1>
        <h2 className="text-lg">Technical</h2>
        <div className="content-card w-3/4 rounded-md border border-primary-foreground p-1">
          <div className="flex justify-evenly gap-3 text-sm">
            <div className="price">
              <div className="text-center">2k</div>
              <div>WINNER</div>
            </div>
            <div className="price">
              <div className="text-center">1k</div>
              <div>RUNNER</div>
            </div>
          </div>
        </div>
        <div className="content-section">
          <p className="text-sm">
            <b>Description:</b> Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Odio, velit asperiores impedit corrupti optio nam
            quia, veniam, pariatur officia doloribus inventore minima
            accusantium explicabo dignissimos assumenda tenetur dolor sapiente
            qui.
          </p>
          <h3>ROUNDS</h3>
          <ol>
            <li>
              <h4>Connection - </h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora labore ipsam minus sint libero explicabo id, earum
                praesentium facilis sequi dolor vitae? Molestiae labore delectus
                laboriosam. Ullam quisquam facere fugiat!
              </p>
            </li>
            <li>
              <h4>Chess Board - </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                quia, voluptates rem nobis suscipit corrupti harum similique ex
                quae mollitia qui obcaecati sit nesciunt necessitatibus
                voluptatibus dolor. Est, molestias ullam?
              </p>
            </li>
          </ol>
          <div className="flex flex-col items-center justify-center">
            <p>Coordinator Jayakarthik-jk</p>
            <p>contact 9884117398</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
