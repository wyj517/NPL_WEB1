import request from "@/utils/request";

export function classIdCount(data) {
  return request({
    url: "/datas/get_class_id_count",
    method: "post",
    data,
  });
}

export function manualIdCount(data) {
  return request({
    url: "/datas/get_manual_tag_count",
    method: "post",
    data,
  });
}
