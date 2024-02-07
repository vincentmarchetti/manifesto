#! python


import argparse

parser = argparse.ArgumentParser(
    prog='build_loader_url',
    description="Builds URL to the manifest loader page with defined manifest url"    
)
parser.add_argument('manifest_url')

LOADER_URL="three_d_manifest_loader.html"

ns = parser.parse_args()

import urllib.parse, posixpath


manifest_parsed_url = urllib.parse.urlparse(ns.manifest_url)
manifest_basename = posixpath.basename( manifest_parsed_url.path )

manifest_query=urllib.parse.urlencode({"url": ns.manifest_url})

loader_parsed_url=urllib.parse.urlparse(LOADER_URL)

loader_with_manifest_url = urllib.parse.urlunparse(
        loader_parsed_url._replace(
            query = manifest_query
        )
    )

print(f'<a href="{loader_with_manifest_url}">{manifest_basename}</a>')    
    
