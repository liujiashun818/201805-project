function* g1() {
    yield 1;
  //  yield* g2();
    yield 2;
}
function* g2() {
    yield 3;
    yield 4;
}
let t1 =g1();
let t2 = g2();
t1.next();

t2.next();
t2.next();
