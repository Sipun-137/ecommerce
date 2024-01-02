type sizesType={
    id:string,
    label:string
}

export default function TileComponent({ data, selected = [], onClick }:any) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap item-center gap-1 ">
      {data.map((item: sizesType) => (
        <label className={`cursor-pointer ${selected && selected.length && selected.map((ditem: { id: any; })=>ditem.id).indexOf(item.id)!==-1?'bg-black text-white':''} `} key={item.id} onClick={()=>{onClick(item)}}>
          <span className="rounded-lg border border-black px-6 py-2 font-bold">
            {item.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
