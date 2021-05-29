#!/bin/bash


register_service () {
    token="$1"
    hostname="$2"
    id_service="$3"
    ip_node="$4"
    ip_service="$5"
    service_tag="$6"
    service_port="$7"
    check_name="$8"
    

    curl --silent -X PUT \
    -H "X-Consul-Token: ${token}" \
    -d '{
      "Node": "'${hostname}'",
      "Address": "'${ip_node}'",
      "NodeMeta": {
        "external-node": "true",
        "external-probe": "true"
      },
      "Service": {
        "ID": "'${id_service}'",
        "Service": "'${hostname}'",
        "Tags": ["'${service_tag}'"],
        "Address":  "'${ip_service}'",
        "Port": '${service_port}'
      },
      "Check": {
       "Name":"'${check_name}'",
       "ServiceID":"'${id_service}'",
       "Status":"passing",
       "Definition":{
        "tcp":"'${ip_service}':'${service_port}'",
        "Interval":"30s",
        "Timeout":"10s",
        "success_before_passing": 0,
        "failures_before_critical": 3
       }
      }
    }'\
    http://api.unicontrol.me:8500/v1/catalog/register
}

deregister_service(){
    token="$1"
    node_id="$2"
    service_id="$3"
    check_id="$4"

    curl --silent -X PUT \
    -H "X-Consul-Token: ${token}" \
    -d '{
        "CheckID": "'${check_id}'",
        "Node": "'${node_id}'",
        "ServiceID": "'${service_id}'"
    }'\
    http://api.unicontrol.me:8500/v1/catalog/deregister
}





register_service d3ec8f28-ce29-47aa-b6c3-892bbf62b17e lan lan 10.2.0.16 172.16.0.108 jadson 8123 monitoring_jadson_smarthome_lan
register_service d3ec8f28-ce29-47aa-b6c3-892bbf62b17e wan wan 10.2.0.16 10.2.0.16 jadson 8123 monitoring_jadson_smarthome_wan
register_service d3ec8f28-ce29-47aa-b6c3-892bbf62b17e jadson jadson 10.2.0.16 172.16.0.108 www 8123 monitoring_jadson_smarthome_www




## DESCOMENTE PARA VALIDAÇÃO 
##{
##  echo ""
##  echo ""
##  echo "[IP-LAN]"
##  host jadson.lan.service.app.unicontrol.me 1.1.1.1
##  echo ""
##  echo "[IP-WAN]"
##  host jadson.wan.service.app.unicontrol.me 1.1.1.1
##  echo ""
##  echo "[GLOBAL]"
##  host jadson.service.app.unicontrol.me 1.1.1.1
##  echo ""
##  echo ""
##  echo ""
##  echo "[TODOS OS SERVICES WAN]"
##  host wan.service.app.unicontrol.me 1.1.1.1
##  echo ""
##  echo ""
##  echo ""
##  echo "[TODOS OS SERVICES LAN]"
##  host lan.service.app.unicontrol.me 1.1.1.1
##}

